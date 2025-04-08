// fiveserver.config.js
export default {
  port: 5500,
  proxy: {
    enable: true,
    url: "http://localhost:5174", // Adjust to your Vite port
    changeOrigin: true,
    preserveHeadersOnError: true
  },
  highlight: true,
  remoteLogs: true,
  mimeTypes: {
    'tsx': 'text/javascript',
    'ts': 'text/javascript',
    'jsx': 'text/javascript',
    'js': 'text/javascript'
  }
};
