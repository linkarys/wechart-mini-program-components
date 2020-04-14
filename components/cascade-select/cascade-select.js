// components/multi-select.js
const noop = () => {};

Component({
  /**
   * Component properties
   */
  properties: {
    data: {
      type: Array,
      value: [],
      observer(data, preData) {
        // 首层数组转成对象方便后续取数
        this.dataMap = this.normalizeData(data);
        this.initSelectedData(data);
      }
    },
    bindconfirm: {
      type: Function,
      value: noop,
    },
    bindcancel: {
      type: Function,
      value: noop,
    },
  },

  attached() {
  },

  ready() {
    // this.handleClickGroup({
    //   target: {
    //     dataset: {
    //       group: 'type'
    //     }
    //   }
    // })
  },

  /**
   * Component initial data
   */
  data: {
    // open为true切换为全屏占用模式
    open: false,

    activeGroup: '',
    activeGroupViewType: 'column',

    // demo: { area: [ [{ label: '附近', id: '1' }, { label: '区域', id: '2' }], [{ label: '余杭', id: '11' }] ], ...}
    filters: {},

    // 保存每一个filter对应的值
    // demo: { area: [ { label: '余杭', id: '1' }, { label: '五常', id: '2' }] }
    selected: {},
  },

  /**
   * Component methods
   */
  methods: {
    /**
     * --------------------------
     * handle data
     * --------------------------
     */
    // 首层数组转成对象方便后续取数
    normalizeData(data) {
      return data.reduce((acc, curr) => ({
        ...acc,
        [curr.name]: curr,
      }), {});
    },


    /**
     * --------------------------
     * handle action
     * --------------------------
     */
    handleClickGroup(event) {
      const preActiveGroup = this.data.activeGroup;
      let activeGroup = event.target.dataset.group;
      let activeFilters = this.data.filters[activeGroup];
      let activeGroupViewType

      if (preActiveGroup !== activeGroup) {
        const content = this.dataMap[activeGroup] || {};
        activeFilters = activeFilters ? activeFilters : [ content.children ];

        activeGroupViewType = this.dataMap[activeGroup].viewType
      // 取消选中
      } else {
        activeGroup = null;
      }

      console.log('activeGroup: %o, activeFilters: %o conf: %o', activeGroup, activeFilters, this.dataMap[activeGroup]);
      this.setData({
        open: true,
        activeGroup,
        activeGroupViewType,
        [`filters.${activeGroup}`]: activeFilters,
      });
    },

    /**
     * 点击一个筛选器, 需要完成两个功能:
     * - 选中当前的筛选器
     * - 添加下一层筛选器内容
     */
    handleClickFilter(event) {
      const { item, level } = event.target.dataset.filter;
      const { filters, activeGroup, selected } = this.data;
      const activeFilters = filters[activeGroup]

      const nextLevel = level + 1
      const groupConf = this.dataMap[activeGroup] || {}
      const { multiple, maxLevel = Infinity } = groupConf
      const selectedGroup = selected[activeGroup]

      const isParentChange = level >= 0
        && level < selectedGroup.length - 1
        && selectedGroup[selectedGroup.length - 2].id !== item.id

      // 父级有变, 需要清掉子级的选项
      if (isParentChange) {
        selectedGroup.splice(level + 1)
      }

      if (multiple && maxLevel === level) {
        let currentSelect = selectedGroup[level] || []

        const isAlreadySelected = currentSelect.some(d => d.id === item.id)

        if (isAlreadySelected) {
          currentSelect = currentSelect.filter(d => d.id !== item.id)
        } else {
          currentSelect.push({
            id: item.id,
            label: item.label,
          })
        }

        selectedGroup[level] = currentSelect
      } else {
        selectedGroup[level] = {
          id: item.id,
          label: item.label,
        }
      }

      activeFilters[nextLevel] = (item.children || [])

      // 需要过滤无值及超出的项目
      const nextActiveFilters = activeFilters
        .filter((d, index) => index <= Math.min(nextLevel, maxLevel) && d.length)

      console.log(
        ' isParentChange: %s, level: %s, groupConf: %o\n multiple: %o\n selectedGroup: %o\n item: %o\n nextActiveFilters: %o',
        isParentChange, level, groupConf, multiple, selectedGroup, item, nextActiveFilters
      );

      this.setData({
        [`selected.${activeGroup}`]: selectedGroup,
        [`filters.${activeGroup}`]: nextActiveFilters,
      });
    },

    // 点击取消
    handleCancel() {
      const { bindcancel } = this.properties;
      this.setData({ open: false, activeGroup: null });
      if (typeof bindcancel === 'function') {
        bindcancel(this.data.selected);
      }
    },

    // 点击确认
    handleConfirm() {
      const { bindconfirm } = this.properties;
      this.setData({ open: false, activeGroup: null });

      if (typeof bindconfirm === 'function') {
        bindconfirm(this.data.selected);
      }
    },


   /**
     * --------------------------
     * handle lifetime
     * --------------------------
     */
    // 将selcetd初始化为 { group1: [], group2: [], ... }
    initSelectedData(data) {
      const { selected } = this.data;
      for (const group of data) {
        const { name } = group;

        if (!name || selected[name]) continue;

        // 直接改变对象, 因为不需要通知页面刷新
        selected[name] = [];
      }
    },
  }
})
