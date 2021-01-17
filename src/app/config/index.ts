interface IConfig {
  client: {
    server: {
      protocol: string;
      host: string;
    };
    endpoint: {
      [key: string]: {
        method: string;
        uri: {
          pathname: string;
        };
      };
    };
  };
}

export const config: IConfig = {
  client: {
    server: {
      protocol: 'http',
      host: 'localhost',
    },
    endpoint: {
      getNews: {
        method: 'GET',
        uri: {
          pathname: '/api/v1/news',
        },
      },
    },
  },
};

export default config;
