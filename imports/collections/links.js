import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';

// Methods
Meteor.methods({
  'links.insert': function(url){
     check(url, Match.Where(url => validUrl.isUri(url)));

     // if check didn't return an error, move to the next step

     // generate random token of 5 characters....
     const token = Math.random().toString(36).slice(-5);
     // saves the data to database
     Links.insert({ url, token, clicks: 0 });
  }
});

export const Links = new Mongo.Collection('links');
