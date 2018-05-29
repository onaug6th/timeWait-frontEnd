// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
//  server中填写本地启动的后端服务端口哦
export const environment = {
  production: false,
  server: "http://localhost:3000/",
  timeout: 60 * 1000,
};
