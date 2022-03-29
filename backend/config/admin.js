module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8829b86c4a0e7ba92e5406829fc70374'),
  },
  url: '/dashboard',
  host: 'my-host', // only used along with `strapi develop --watch-admin` command
  port: 1338,
});
