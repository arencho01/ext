/**
 * Ext 2.2.1
 * Contain data for miscleanous plugins
 */

if(Ext.grid.GridFilters){
	Ext.apply(Ext.grid.GridFilters.prototype, {
    	filtersText    : LS.__translate(LS.Filters)
  	});
}

if(Ext.grid.filter.DateFilter){
	Ext.apply(Ext.grid.filter.DateFilter.prototype, {
		beforeText: LS.__translate(LS.do),
    	afterText: LS.__translate(LS.After),
    	onText: LS.__translate(LS.In)
  	});
}