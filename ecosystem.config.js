module.exports = {
    apps : [{
      name: 'rvc-api',
      script: './rvcApi.js',
  
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: '--update-env',
      node_args: '-r esm',
      instances: 1,
      autorestart: true,
      watch: false,
      exec_mode: 'fork',
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'desa'
      },
      env_production: {
        NODE_ENV: 'prod'
      }
    }]
  };
