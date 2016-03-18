var RtbObject = require('../rtbObject');
var PublisherBuilder = require('./publisher').builder;
var removeEmptyValues = require('../utils').removeEmptyValues;

var Site = function(id, name, domain, cat, sectionCat, pageCat, page, ref, search, mobile, privacypolicy, publisher, keyworkds, ext){
  this.id = id;
  this.name = name;
  this.domain = domain;
  this.cat = cat;
  this.sectionCat = sectionCat;
  this.pageCat = pageCat;
  this.page = page;
  this.ref = ref;
  this.search = search;
  this.mobile = mobile;
  this.privacypolicy = privacypolicy;
  this.publisher = publisher;
  this.keyworkds = keyworkds;
  this.ext = ext;
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

SiteBuilder.prototype.sectionCat = function(sectionCat){
  this._sectionCat = sectionCat;
  return this;
};

SiteBuilder.prototype.pageCat = function(pageCat){
  this._pageCat = pageCat;
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

SiteBuilder.prototype.keyworkds = function(keyworkds){
  this._keyworkds = keyworkds;
  return this;
};

SiteBuilder.prototype.ext = function(ext){
  this._ext = ext;
  return this;
};

SiteBuilder.prototype.build = function() {
  var native = new Site(
      this._id,
      this._name,
      this._domain,
      this._cat,
      this._sectionCat,
      this._pageCat,
      this._page,
      this._ref,
      this._search,
      this._mobile,
      this._privacypolicy,
      this._publisher,
      this._keyworkds,
      this._ext
  );
  return removeEmptyValues(native);
};

module.exports = {
  object: Site,
  builder: SiteBuilder
};
