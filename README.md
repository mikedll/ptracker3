
# Rails 5.2 SPA

This is a Rails 5.2 SPA supporting server-side rendering, code splits,
router-tracking with react-router, UIs processed with React, and
dynamic imports of components with react-loadable.

# Setup

This has no production home yet.

    - Ruby 2.3.1.
    - PostgreSQL (setup a user for yourself)

Starting the application:

    # Install gems
    bundle 

    # Load schema and create sample data.
    bin/rake db:prepare 

    # Build the webpack bundles and leave a dev server running.
    bin/webpack-dev-server

    # Start app.
    bin/rails           

