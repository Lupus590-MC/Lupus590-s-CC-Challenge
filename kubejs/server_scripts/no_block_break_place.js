let Lupus590 = {};
Lupus590.Serialise = function(obj, indent){
	let maxIndent = 0;
	
	if (indent !== undefined && indent !== null){
		indent = indent;
	}else{
		indent = 0;
	}
  
	if (indent > maxIndent){
		if (typeof(obj) === 'string'){
			return '"'+obj+'"';
		}else if (typeof(obj) === 'boolean' || typeof(obj) === 'number'){
			return obj;
		}else if (typeof(obj) === 'function'){
			return "function";
		}else if (obj === null || obj === undefined){
			return "null";
		}else if (typeof(obj) === 'object' && obj !== null){
			return "max indent object";
		}else{    
			console.info('unhandled case');
			throw {message: 'unhandled case'};
		}  
	}  

	if (typeof(obj) === 'string'){
		return '"'+obj+'"';
	}else if (typeof(obj) === 'boolean' || typeof(obj) === 'number'){
		return obj;
	}else if (typeof(obj) === 'function'){
		return "function";
	}else if (obj === null || obj === undefined){
		return "null";
	}else if (typeof(obj) === 'object' && obj !== null){
		let s = "{\n";    
		let pad = "";
		indent = indent+1;
		pad = "    ".repeat(indent);
		Object.keys(obj).forEach(key => {
		s = s+pad+key+" = "+Lupus590.Serialise(obj[key], indent)+",\n";
		});
		indent = indent-1;
		if (indent > 0){
		pad = "    ".repeat(indent);
		}
		else{
		pad = "";
		}
		s = s+pad+"}";
		return s;
	}else{    
		console.info('unhandled case');
		throw {message: 'unhandled case'};
	}  
};

Lupus590.isFakePlayer = function(event){
	if(! (event && event.player)){
		return false;
	}
  	return event.player.fake || (event.player.openInventory && event.player.openInventory.computer);
};

Lupus590.isFakeEntity = function(event){
	if(! (event && event.getEntity())){
		return false;
	}
  	return event.getEntity().fake || (event.getEntity().openInventory && event.getEntity().openInventory.computer);
};

events.listen('block.break', function (event) {
	console.info(Lupus590.Serialise(event.getEntity()));
	console.info(Lupus590.Serialise(event.player));

	if (true){
	return;
	}

	if (event.player.fake || (event.player.openInventory && event.player.openInventory.computer)){
	return;
	}

	if (!event.block.id.match("computercraft:")){
	event.player.tell("You just tried to break a banned block. Only computercraft blocks are allowed to be broken manually.");
	event.cancel();
	}
});

events.listen('block.place', function (event) {
    //console.info(Lupus590.Serialise(event.getEntity()));
    //console.info(Lupus590.Serialise(event.player));

    if (event.getEntity().fake || (event.getEntity().openInventory && event.getEntity().openInventory.computer) || Lupus590.isFakeEntity() || Lupus590.isFakePlayer()){
      	return;
    }
    
    if (!event.block.id.match("computercraft:")){
      	event.getEntity().tell("You just tried to place a banned block. Only computercraft blocks are allowed to be placed manually. Also, your inventory has probably desynced, just interact with the slot that you just used to fix it.");
      	event.cancel();
    }
});
  