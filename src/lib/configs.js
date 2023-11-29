const ROOT_URL = "https://www.rpdaley.com";
const ROOT_CONFIG = "/configs/root.json";

export default function fetchConfig(dataSource) {
  return new Promise((resolve, reject) => {
    fetch(`${ROOT_URL}${ROOT_CONFIG}`)
      .then((rootData, err) => rootData.json())
      .then((rootDataJson) => {
        // eslint-disable-next-line no-prototype-builtins
        if (rootDataJson.hasOwnProperty(dataSource)) {
          const dataSourceLink = rootDataJson[dataSource].link;
          fetch(`${ROOT_URL}${dataSourceLink}`)
            .then((returnData) => returnData.json())
            .then((returnDataJson) => {
              resolve(returnDataJson);
            });
        }
      });
  });
}
