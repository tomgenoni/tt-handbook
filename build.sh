#!/bin/sh

rm data/data.json;
curl 'https://cdn.contentful.com/spaces/dmh1ldog4sut/entries?access_token=418bdd68c6a72ad5ea9be6d56194065ca14fd9f1e9c856f2d87b11e46f59a6fe&include=1' > data/data.json;
gulp build;
