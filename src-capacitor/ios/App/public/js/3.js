(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{ec8f:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-card",{staticClass:"bg-none",attrs:{flat:"",square:""}},[t.data.length?r("q-card-section",{staticClass:"q-py-none"},[r("apex-chart",{ref:"chart",attrs:{type:"bar",series:t.series,height:t.chartHeight,options:t.chartOptions}})],1):t._e()],1)},n=[],i=(r("8e6e"),r("8a81"),r("456d"),r("f3e3")),o=r.n(i),s=r("cd04"),c=r.n(s),f=(r("6b54"),r("7f7f"),r("ac6a"),r("cadf"),r("06db"),r("4f7f"),r("5df3"),r("1c4c"),r("c47a")),u=r.n(f),l=(r("c5f6"),r("2e37"),r("78c3")),h=20,p=120,d=500,m={mounted:function(){this.setHeight()},data:function(){return{chartHeight:100}},watch:{series:function(t,e){this.setHeight()}},methods:{setHeight:function(){var t=this.chartOptions.xaxis.categories.length*h;if(t&&this.$refs.chart){var e=this.$refs.chart.$el.getElementsByClassName("apexcharts-legend")[0].clientHeight;this.$q.platform.is.desktop?this.chartHeight=d+e:this.chartHeight=t+e+p}else this.chartHeight=d}}},g=r("2f62"),b=r("1321"),y=r.n(b);function O(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function x(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?O(Object(r),!0).forEach((function(e){u()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var v={name:"TaskByNDays",components:{ApexChart:y.a},mixins:[m],props:{data:{type:Array,required:!0}},created:function(){this.initialize()},data:function(){return{series:[],chartOptions:{responsive:[{breakpoint:480,options:{plotOptions:{bar:{horizontal:!0}},title:{style:{fontSize:"1rem"},floating:!0},xaxis:{labels:{formatter:function(t){return Math.round(100*(t/60+Number.EPSILON))/100}}},yaxis:{title:{text:void 0}},legend:{position:"top",horizontalAlign:"left",fontSize:"auto",offsetY:15,itemMargin:{vertical:0}}}}],chart:{type:"bar",stacked:!0},plotOptions:{bar:{horizontal:!1}},theme:{palette:"palette3"},dataLabels:{formatter:function(t){return"".concat(l["a"].inMinutes(t),"m")}},stroke:{width:1,colors:["#fff"]},title:{text:"",style:{fontSize:"1.5rem"},margin:15,offsetY:10},subtitle:{text:"",floating:!1,margin:0,offsetY:24},yaxis:{categories:[],labels:{formatter:function(t){return Math.round(100*(t/60+Number.EPSILON))/100}}},xaxis:{categories:[],title:{text:void 0}},tooltip:{y:{formatter:function(t){return l["a"].elapsedTime(t)}}},fill:{opacity:1},legend:{position:"bottom",horizontalAlign:"left",offsetY:5,fontSize:"16px",itemMargin:{vertical:1}}}}},computed:x({},Object(g["c"])("tasks",["taskById"])),methods:{initialize:function(){var t=this;if(this.data.length){var e=Array.from(new Set(this.data.map((function(t){return t.datekey})))).sort(),r=Array.from(new Set(this.data.map((function(t){return t.task})))),a=r.map((function(r){return{name:t.taskById(r).name,data:e.map((function(e){return t.data.filter((function(t){return t.datekey===e&&t.task===r})).map((function(t){return t.progress})).reduce((function(t,e){return t+e}),0)}))}}));this.series=a,this.chartOptions.xaxis.categories=e.map((function(t){return l["a"].formatDate(l["a"].extractDate(t.toString()),"DD MMM")}));var n=this.data.map((function(t){return t.progress})).reduce((function(t,e){return t+e}),0);this.chartOptions.title.text=l["a"].elapsedTime(n,!0),this.chartOptions.subtitle.text=this.buildCaption(e)}},buildCaption:function(t){var e="DD MMMM YYYY",r=c()(t),a=r[0],n=r.slice(1);if(!t.length)return"";var i=l["a"].formatDate(l["a"].extractDate(a.toString()),e);if(1===t.length)return"".concat(i," - ").concat(l["a"].formatDate(Date.now(),e));var s=n.reverse(),f=o()(s,1),u=f[0],h=l["a"].formatDate(l["a"].extractDate(u.toString()),e);return"".concat(i," - ").concat(h)}}},w=v,D=r("2877"),k=r("f09f"),S=r("a370"),j=r("eebe"),M=r.n(j),z=Object(D["a"])(w,a,n,!1,null,null,null);e["default"]=z.exports;M()(z,"components",{QCard:k["a"],QCardSection:S["a"]})}}]);