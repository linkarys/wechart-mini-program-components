// This is our App Service.
// This is our data.
var helloData = {
	name: 'WeChat'
}

import demoData from '../demo-data.js';

// Register a Page.
Page({
	data: {
		helloData,
		cascadeData: demoData,
	},
	onLoad() {
		this.setData({
			handleSelectCancel: this.handleSelectCancel.bind(this),
			handleSelectChange: this.handleSelectChange.bind(this),
		})
	},
	handleSelectCancel: function(e) {
		console.log('cancel select')
	},
	handleSelectChange: function(data) {
		console.log('data: %o', data)
	}
})
