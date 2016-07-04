var RtbObject = require('../rtbObject');
var removeEmptyValues = require('../utils').removeEmptyValues;

var Content = function(id, episode, title, series, season, url, cat, videoquality, context, language){
  this.id = id;
  this.episode = episode;
  this.title = title;
  this.series = series;
  this.season = season;
  this.url = url;
  this.cat = cat;
  this.videoquality = videoquality;
  this.context = context;
  this.language = language;
};

Content.prototype = Object.create(RtbObject.prototype);

var ContentBuilder = function(){};

ContentBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

ContentBuilder.prototype.episode = function(episode){
  this._episode = episode;
  return this;
};

ContentBuilder.prototype.title = function(title){
  this._title = title;
  return this;
};

ContentBuilder.prototype.series = function(series){
  this._series = series;
  return this;
};

ContentBuilder.prototype.season = function(season){
  this._season = season;
  return this;
};

ContentBuilder.prototype.url = function(url){
  this._url = url;
  return this;
};

ContentBuilder.prototype.cat = function(cat){
  this._cat = cat;
  return this;
};

ContentBuilder.prototype.videoquality = function(videoquality){
  this._videoquality = videoquality;
  return this;
};

ContentBuilder.prototype.context = function(context){
  this._context = context;
  return this;
};

ContentBuilder.prototype.language = function(language){
  this._language = language;
  return this;
};


ContentBuilder.prototype.build = function() {
  var content = new Content(
      this._id,
      this._episode,
      this._title,
      this._series,
      this._season,
      this._url,
      this._cat,
      this._videoquality,
      this._context,
      this._language
  );
  return removeEmptyValues(content);
};

module.exports = {
  object: Content,
  builder: ContentBuilder
};
