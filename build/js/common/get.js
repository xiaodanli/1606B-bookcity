"use strict";define(["jquery"],function(c){var i={};return function(r,n,u){return new Promise(function(t,e){i[r]?t(i[r]):c.ajax({url:r,dataType:"text",type:u||"get",data:n||null,success:function(n){i[r]=n,t(n)},error:function(n){e(n)}})})}});