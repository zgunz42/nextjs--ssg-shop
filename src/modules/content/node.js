import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import { readFmrFile, readJsonFile, readYamlFile } from './reader';

const loader = {
  md: readFmrFile,
  yaml: readYamlFile,
  json: readJsonFile,
};

// only work for single path
function update(object, fn) {
  return _.reduce(
    _.map(object, (v, k) => fn(k, v)),
    (a, b) => ({ ...a, ...b }),
  );
}

export function getNode(
  nodeRoot,
  { name: node, mapDataInjector, mapDataModifier },
  name,
  fullName = false,
  extension,
) {
  const nodeExtension = extension || _.split(name, '.')[1];
  return async ({ modifier, injector }) => {
    const pathName = fullName ? `${nodeRoot}/${node}/${name}` : `${nodeRoot}/${node}/${name}.${nodeExtension}`;
    const fileObject = await loader[nodeExtension](path.resolve(pathName));
    const afterInject = mapDataInjector ? update(mapDataInjector, injector(fileObject)) : {};
    const afterModified = mapDataModifier ? update(mapDataModifier, modifier(fileObject)) : {};

    return {
      ...fileObject,
      ...afterInject,
      ...afterModified,
      node,
    };
  };
}

export function getNodeSection(nodeRoot, node) {
  return new Promise((resolve, reject) => {
    fs.readdir(path.resolve(`${nodeRoot}/${node.name}`), (err, files) => {
      if (!err) {
        const nodeRequests = files.map(
          (filename) => getNode(nodeRoot, node, filename, true),
        );
        resolve(nodeRequests);
      } else {
        reject(err.toString());
      }
    });
  });
}

export function getAllNode(nodeRoot, nodes) {
  const nodeSections = nodes.map((section) => getNodeSection(nodeRoot, section));
  return Promise.all(nodeSections).then((sections) => _.flatten(sections));
}
