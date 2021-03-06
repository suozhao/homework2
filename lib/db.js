const Tapable = require('tapable')

class DB extends Tapable {
	constructor(options) {
		super(options)
		this.options = options || {};
	}

	request(options) {
		// TODO
		Object.assign(this.options,this.applyPluginsWaterfall('options',options))
		return this.applyPluginsBailResult('endpoint',this.options).then(res=>{
			if(!this.applyPluginsBailResult('judge', res)) {
				return Promise.resolve(res);
			} else{
				return Promise.reject(res);
			}
		})
	}
}
module.exports = DB