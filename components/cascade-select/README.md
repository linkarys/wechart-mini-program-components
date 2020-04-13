# 小程序级联选择器


## 数据结构

```javascript
{
	id: 0,
	name: 'area',
	label: '区域',
	// 列式 or 行式, 默认 列式
	viewType: 'column',
	// 是否多选
	multiple: true,
	// 指明filter层数, multiple=true时必需, 否则multiple无效
	maxLevel: 2,
	children: [{
		id: 1,
		label: '附近',
		children: [...]
	}, ...],
},


{
	id: 1,
	label: '租金',
	name: 'money',
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
	children: [],
}]
```
