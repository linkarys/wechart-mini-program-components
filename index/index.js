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
	changeName: function (e) {
		// sent data change to view
		this.setData({
			name: 'MINA'
		})
	}
})
