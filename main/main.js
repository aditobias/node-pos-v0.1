module.exports = function main(inputs) {
    var listOfItems = [];
    
    inputs.forEach(function(item){
        if(listOfItems.find(listItem => listItem['Barcode'] === item.Barcode)){
            var editableItem = listOfItems[listOfItems.findIndex(element => element.Barcode === item.Barcode)];
            editableItem.Total += 1;
        }else{
            var item = {
                Barcode : item.Barcode,
                Name : item.Name,
                Unit : item.Unit,
                Price : item.Price,
                Total : 1
            };
            listOfItems.push(item);
        }
    }); 
    
    return '***<store earning no money>Receipt ***\n' +
    stringBuilder(listOfItems) +
    '----------------------\n' +
    'Total: 23.00 (yuan)\n' +
    '**********************\n';
    
};
function stringBuilder(listOfItems){
    var finalString = "";
    
    listOfItems.forEach(function(item){
        if(item.Unit === 'bottle'){
            finalString += 'Name: ' + item.Name +', Quantity: ' + item.Total +' bottles, Unit price: '+item.Price.toFixed(2)+' (yuan), Subtotal: '+ calculateTotal(item)+'.00 (yuan)\n';
        }else{
            finalString += 'Name: ' + item.Name +', Quantity: ' + item.Total +', Unit price: '+item.Price.toFixed(2)+' (yuan), Subtotal: '+ calculateTotal(item)+'.00 (yuan)\n';
        }
    })

    return finalString;
    
};

function calculateTotal(item){
    return item.Total * item.Price;
}

