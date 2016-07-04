var RtbObject = require('../rtbObject');
var PublisherBuilder = require('./publisher').builder;
var ContentBuilder = require('./content').builder;
var removeEmptyValues = require('../utils').removeEmptyValues;

var Site = function(id, name, domain, cat, sectioncat, pagecat, page, ref, search, mobile, privacypolicy, publisher, keywords, ext, content){
  this.id = id;
  this.name = name;
  this.domain = domain;
  this.cat = cat;
  this.sectioncat = sectioncat;
  this.pagecat = pagecat;
  this.page = page;
  this.ref = ref;
  this.search = search;
  this.mobile = mobile;
  this.privacypolicy = privacypolicy;
  this.publisher = publisher;
  this.keywords = keywords;
  this.ext = ext;
  this.content = content;
};

Site.prototype = Object.create(RtbObject.prototype);

var SiteBuilder = function(){};

SiteBuilder.prototype.id = function(id){
  this._id = id;
  return this;
};

SiteBuilder.prototype.name = function(name){
  this._name = name;
  return this;
};

SiteBuilder.prototype.domain = function(domain){
  this._domain = domain;
  return this;
};

SiteBuilder.prototype.cat = function(cat){
  this._cat = cat;
  return this;
};

SiteBuilder.prototype.sectioncat = function(sectioncat){
  this._sectioncat = sectioncat;
  return this;
};

SiteBuilder.prototype.pagecat = function(pagecat){
  this._pagecat = pagecat;
  return this;
};

SiteBuilder.prototype.page = function(page){
  this._page = page;
  return this;
};

SiteBuilder.prototype.ref = function(ref){
  this._ref = ref;
  return this;
};

SiteBuilder.prototype.search = function(search){
  this._search = search;
  return this;
};

SiteBuilder.prototype.mobile = function(mobile){
  this._mobile = mobile;
  return this;
};

SiteBuilder.prototype.privacypolicy = function(privacypolicy){
  this._privacypolicy = privacypolicy;
  return this;
};

SiteBuilder.prototype.publisher = function(publisher){
  var builder = new PublisherBuilder();
  this._publisher = builder
                    .id(publisher.id)
                    .name(publisher.name)
                    .build();
  return this;
};

SiteBuilder.prototype.keywords = function(keywords){
  this._keywords = keywords;
  return this;
};

SiteBuilder.prototype.ext = function(ext){
  this._ext = ext;
  return this;
};

SiteBuilder.prototype.content = function(content){
  var builder = new ContentBuilder();
  this._content = builder
                    .id(content.id)
                    .episode(content.episode)
                    .title(content.title)
                    .series(content.series)
                    .season(content.season)
                    .url(content.url)
                    .cat(content.cat)
                    .videoquality(content.videoquality)
                    .context(content.context)
                    .language(content.language)
                    .build();
  return this;
};

SiteBuilder.prototype.build = function() {
  var native = new Site(
      this._id,
      this._name,
      this._domain,
      this._cat,
      this._sectioncat,
      this._pagecat,
      this._page,
      this._ref,
      this._search,
      this._mobile,
      this._privacypolicy,
      this._publisher,
      this._keywords,
      this._ext,
      this._content
  );
  return removeEmptyValues(native);
};

module.exports = {
  object: Site,
  builder: SiteBuilder
};
