export default function api(nodeId, path, scope) {return fetch(`/api/${scope}/${nodeId}/${path}.json`)}
