export default [
{
	id: 0,
	name: 'area',
	label: '区域',
	viewType: 'column',
	// 是否多选
	multiple: true,
	// 指明filter层数, multiple=true时必需, 否则multiple无效
	maxLevel: 2,
	placeholder: '请选择',
	children: [{
		id: 1,
		label: '附近',
		children: [{
			id: 10,
			label: '不限'
		}, {
			id: 11,
			label: '1000m内',
			children: [
				{
					id: 41,
					label: '全余杭',
				},
				{
					id: 51,
					label: '勾庄',
				},
			]
		}, {
			id: 12,
			label: '3000m内',
			children: [
				{
					id: 141,
					label: '江干',
				},
				{
					id: 151,
					label: '西湖',
				},
			]
		}, {
			id: 13,
			label: '5000m内'
		}]
	}, {
		id: 2,
		label: '区域',
		children: [{
			id: 20,
			label: '不限',
			children: [
				{
					id: 41,
					label: '1全余杭',
				},
				{
					id: 51,
					label: '1勾庄',
				},
			]
		}, {
			id: 21,
			label: '余杭',
			children: [
				{
					id: 41,
					label: '2全余杭',
				},
				{
					id: 51,
					label: '2勾庄',
				},
			]
		}, {
			id: 22,
			label: '萧山',
			children: [
				{
					id: 41,
					label: '3全余杭',
				},
				{
					id: 51,
					label: '3勾庄',
				},
			]
		}, {
			id: 23,
			label: '江干',
		}]
	}],
},


{
	id: 1,
	label: '租金',
	name: 'money',
	placeholder: '请选择',
	viewType: 'row',
	children: (new Array(20))
		.fill(0)
		.map((d, i) => ({
			id: `id-${i}`,
			label: `${1000 * i} - ${1000 * (i + 1)}`
		}))
},

{
	id: 2,
	label: '户型',
	name: 'type',
	placeholder: '请选择',
	viewType: 'row',
	children: [
		{
			id: 'id' + 1,
			label: '1室',
			type: 'group',
			children: (new Array(5))
				.fill(0)
				.map((d, i) => ({
					id: `id-${i}`,
					label: `asss-${i}`,
					children: (new Array(1))
						.fill(0)
						.map((d, j) => ({
							id: `id-${i}-${j}`,
							type: 'group',
							label: `id-${i}-${j}`,
							children: (new Array(2))
								.fill(0)
								.map((d, k) => ({
									id: `id-${i}-${j}-${k}`,
									label: `id-${i}-${j}-${k}`,
								}))
						}))
				}))
		}
	]
},

{
	id: 3,
	label: '筛选',
	name: 'other',
	placeholder: '请选择',
	children: [],
}]
