let Lupus590 = {};
Lupus590.Serialise = function(obj, indent){
  if (indent !== undefined && indent !== null){
    indent = indent;
  }else{
    indent = 0;
  }
  
  if (indent > 0){
    if (obj !== null && obj !== undefined && typeof(obj.toString)==='function'){
      return "max indent "+obj.toString();
    }
    else{
      return "max indent null";
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

events.listen('block.break', function (event) {
    if (event.player.openInventory !== undefined && event.player.openInventory !== null && event.player.openInventory.computer !== undefined && event.player.openInventory.computer !== null){
      return;
    }

    if (!event.block.id.match("computercraft:")){
      event.player.tell("You just tried to break a banned block. Only computercraft blocks are allowed to be broken manually.");
      event.cancel();
    }
  });

  events.listen('block.place', function (event) {
    if (event.getEntity().openInventory.computer !== undefined && event.getEntity().openInventory.computer !== null){
      return;
    }
    
    if (!event.block.id.match("computercraft:")){
      event.getEntity().tell("You just tried to place a banned block. Only computercraft blocks are allowed to be placed manually. Also, your inventory has probably desynced, just interact with the slot that you just used to fix it.");
      event.cancel();
    }
  });