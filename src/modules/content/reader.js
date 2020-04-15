import fm from 'front-matter';
import vfile from 'to-vfile';
import YAML from 'yaml';

export function readFmrFile(path) {
  return new Promise((resolve, reject) => {
    vfile.read(path, (err, file) => {
      if (!err) {
        const { attributes, body } = fm(file.contents.toString());
        resolve({ ...attributes, body });
      } else {
        reject(err.toString());
      }
    });
  });
}

export function readYamlFile(path) {
  return new Promise((resolve, reject) => {
    vfile.read(path, (err, file) => {
      if (!err) {
        const attributes = YAML.parse(file.contents.toString());
        resolve({ ...attributes });
      } else {
        reject(err.toString());
      }
    });
  });
}

export function readJsonFile(path) {
  return new Promise((resolve, reject) => {
    vfile.read(path, (err, file) => {
      if (!err) {
        const data = JSON.parse(file.contents.toString());
        resolve({ ...data });
      } else {
        reject(err.toString());
      }
    });
  });
}
