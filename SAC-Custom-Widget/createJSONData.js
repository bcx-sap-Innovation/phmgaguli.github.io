var DS_1 = Table_1.getDataSource();
var dimList = DS_1.getMembers("Product",100);
var json = "";
for(var i = 0; i < dimList.length; i++){
	var label = '"name":"'+dimList[i].id+'"';
	var value = DS_1.getData({
		"@MeasureDimension":"[Account].[parentId].&[Sales_Value]", 
		"Product":dimList[i].id
	});
	var svalue = DS_1.getData({
		"@MeasureDimension":"[Account].[parentId].&[Units_Sold]", 
		"Product":dimList[i].id
	});
	var cvalue = DS_1.getData({
		"@MeasureDimension":"[Account].[parentId].&[Discount]", 
		"Product":dimList[i].id
	});		
	var val='';
	var sval='';
	var cval='';
	if(value === undefined || svalue === undefined || cvalue === undefined){
		// Do nothing
	}else{
		val = value.rawValue;
		sval = svalue.rawValue;
		cval = cvalue.rawValue;
		json = json + "{" + label + "," + '"xvalue":' + val + ","+'"size":' + sval +',"color":'+cval+"},";
	}	
}
json = "[" + json.substring(0,json.length-1) + "]";
return json;