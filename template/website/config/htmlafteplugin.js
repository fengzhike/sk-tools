function HtmlAfterPlugin(options){
	this.options = options
}

function sortByOrders(arrs){
	arrs = arrs.sort((mapf,maps)=>{
		let fIndex = 2,sIndex = 2;
		if(mapf.indexOf('vendor')>-1){
			fIndex = 0;
		}else if(mapf.indexOf('common')>-1){
			fIndex = 1;
		}
		if(maps.indexOf('vendor')>-1){
			sIndex = 0;
		}else if(maps.indexOf('common')>-1){
			sIndex = 1;
		}
		return fIndex > sIndex;
	})
	return arrs;
}

function arraytoStringByAssets(arrs, isJs){
	arrs = sortByOrders(arrs);
	arrs = arrs.map(item=>{
		if(isJs){
			return `<script src="${item}"></script>`;
		}else{
			 return `<link rel="stylesheet" href="${item}">`;
		}
	})
	return arrs.join("");
}

function createMapDBJs(arrs) {
    let maps = {};
    // let reg= /.+\/(.+)\.\w|\d+.js$/;
    let reg= /.+\/((\w|-)+)\.((\w{5})\.)?\w|\d+.js$/;
    arrs = sortByOrders(arrs);
    arrs.forEach(arr=>{
        let regRet = reg.exec(arr);
        if (regRet) {
            regRet = regRet[1].split('-')[0];
            maps[regRet] = arr;
        }
    });

    return `
        <script>
            var jsMap = ${JSON.stringify(maps)};
            var createScript = function(content) {
                var scriptDom = document.createElement('script');
                scriptDom.innerHTML = content;
                document.body.appendChild(scriptDom);
            }
            var getScript = function(key) {
                axios.get(jsMap[key]).then(function(value) {
                    localStorage.setItem(key, jsMap[key]);
                    localStorage.setItem(jsMap[key], value.data);
                    createScript(value.data);
                });
            };
            var jsMapKeys = Object.keys(jsMap);
            for (var i = 0; i < jsMapKeys.length; i++) {
                var key = jsMapKeys[i];
                !(function(vkey) { 
                    var val = localStorage.getItem(vkey);
                    if (!val) {
                        getScript(vkey);
                    } else {
                        if (val === jsMap[vkey]) {
                            var scriptValue = localStorage.getItem(jsMap[vkey]);
                            scriptValue && createScript(scriptValue);
                        } else {
                            localStorage.removeItem(val);
                            getScript(vkey);
                        }
                    }
                }(key));
            }
        </script>
    `;
}

HtmlAfterPlugin.prototype.apply = function(compiler){
	compiler.plugin('compilation',function(compilation){
		compilation.plugin('html-webpack-plugin-after-html-processing',function(htmlPluginData, callback){
			let assets = htmlPluginData.assets;
			let html = htmlPluginData.html;
			html = html.replace('{% block styles %}',`{% block styles %}${arraytoStringByAssets(assets.css,false)}`);
			html = html.replace('{% block script %}',`{% block script %}${createMapDBJs(assets.js)}`);
			htmlPluginData.html = html;
			callback(null, htmlPluginData);
		})
	})
}

module.exports = HtmlAfterPlugin;
