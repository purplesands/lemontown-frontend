# Lemontown

fun friendly community for chatting, reflecting, and creating

Find a stable build of Lemontown hosted [here](https://lemon-town.herokuapp.com).

+ Lemontown has a few rules
+ Every day there are 5 words
+ Every day there is a room you can post in, and comment on other's posts using today's words. Posts float around
+ Every next day that day's posts are archived and rendered anonymously
+ Post journal entries, polemics, poems, essays, whatever to your profile
+ Follow others and view their posts in your friend feed, comment on them if you wish (anonymously, with a 20 character limit)

## Installation

#### Backend

The backend can be found [here](https://github.com/purplesands/lemontown-backend).
To install run:

+ `$ git clone git@github.com:purplesands/lemontown-backend.git`
+ `$ cd lemontown-backend`
+ `$ rake db:create`
+ `$ rake db:migrate`

To run the app locally, first do the following:

+ in `app/controllers/application_controller.rb`, comment out lines 3 and 9, and uncomment lines 4 and 10. Alternatively, if you'd like secure password encryption, you can edit your rails credentials file([instructions here](https://medium.com/craft-academy/encrypted-credentials-in-ruby-on-rails-9db1f36d8570)) and add the following:
      jwt: some_unique_string
Then run:

+ `$ bundle`
+ `$ rails s`

The database will run at `localhost:3000`.

#### Frontend

This repository contains Lemontowns's frontend. To install it, run:

+ `$ git clone git@github.com:purplesands/lemontown-frontend.git`
+ `$ cd lemontown-frontend`
+ `$ npm install`
+ `$ npm start`

Run at localhost:3001.

### License

Lemontown is licensed under the MIT License.

Copyright 2019 Joe Mullen.
