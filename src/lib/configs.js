const ROOT_CONFIG = '/configs/root.json';
const META_ROOT_DIR = `/configs/metadata/`;
const META_ROOT_CONFIG = 'root.json';

export function fetchConfig(dataSource) {
  return new Promise((resolve) => {
    fetch(`${ROOT_CONFIG}`)
      .then((rootData) => rootData.json())
      .then((rootDataJson) => {
        // eslint-disable-next-line no-prototype-builtins
        if (rootDataJson.hasOwnProperty(dataSource)) {
          const dataSourceLink = rootDataJson[dataSource].link;
          fetch(`${dataSourceLink}`)
            .then((returnData) => returnData.json())
            .then((returnDataJson) => {
              resolve(returnDataJson);
            });
        }
      });
  });
}

export function fetchMetaConfig(metaPath) {
  return new Promise((resolve) => {
    fetch(`${META_ROOT_DIR}${META_ROOT_CONFIG}`)
      .then((rootData) => rootData.json())
      .then((rootDataJson) => {
        if (rootDataJson.includes(metaPath)) {
          fetch(`${META_ROOT_DIR}items/${metaPath}.json`)
            .then((returnData) => returnData.json())
            .then((returnDataJson) => {
              resolve(returnDataJson);
            });
        }
      });
  });
}
