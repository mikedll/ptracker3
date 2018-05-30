
# Rails 5.2 SPA

This is a Rails 5.2 SPA supporting server-side rendering, code splits,
router-tracking with react-router, UIs processed with React, and
dynamic imports of components with react-loadable.

# Resources

This site is in production at [reactexperiments.herokuapp.com](http://reactexperiments.herokuapp.com/).

Its Trello page is viewable at [trello.com/b/kL9mBTPM/react-experiments](https://trello.com/b/kL9mBTPM/react-experiments).

# Setup

Some dependencies, and their versions:

  - Ruby 2.3.1.
  - PostgreSQL (setup a user for yourself)
  - Webpack 3.11.0
  - React 16.3.0
  - React Router 4.2.2

In development, I use the following versions of these dependencies:

  - node 8.11.1
  - npm 6.0.0

Starting the application:

    # Install gems
    bundle 

    # Load schema and create sample data.
    bin/rake db:prepare 

    # Build the webpack bundles and leave a dev server running.
    bin/webpack-dev-server

    # Start app.
    bin/rails           

