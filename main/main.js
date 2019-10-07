var listOfBoughtItems = [];
var finalString = "";
var listOfBoughtItemsForReceipt = [];

module.exports = function main(inputs) {
    listOfBoughtItems = inputs;

    listOfBoughtItems.forEach(function(item){
        if(listOfBoughtItemsForReceipt.find(boughtItem => boughtItem['Barcode'] === item.Barcode)){
            listOfBoughtItemsForReceipt[listOfBoughtItemsForReceipt.findIndex(boughtItem => boughtItem.Barcode === item.Barcode)].Total += 1;
        }else{
            var listedItem = {
                Barcode : item.Barcode,
                Name : item.Name,
                Unit : item.Unit,
                Price : item.Price,
                Total : 1
            };
            listOfBoughtItemsForReceipt.push(listedItem);
        }
    }); 
    
    return finalReceipt();
    
};
function finalReceipt(){
    listOfBoughtItemsForReceipt.forEach(function(item){
        if(item.Unit === 'bottle'){
            finalString += 'Name: ' + item.Name +', Quantity: ' + item.Total 
                        +' bottles, Unit price: '+ item.Price.toFixed(2) +' (yuan), Subtotal: '
                        + calculateSubTotal(item).toFixed(2) +' (yuan)\n';
        }else{
            finalString += 'Name: ' + item.Name +', Quantity: ' + item.Total 
                        +', Unit price: '+ item.Price.toFixed(2) +' (yuan), Subtotal: '
                        + calculateSubTotal(item).toFixed(2) +' (yuan)\n';
        }
    })


    return '***<store earning no money>Receipt ***\n' +
            finalString +
            '----------------------\n' +
            'Total: '+ calculateFinalTotal() +' (yuan)\n' +
            '**********************\n';
    
};

function calculateSubTotal(item){
    return item.Total * item.Price;
}

function calculateFinalTotal(){
    return listOfBoughtItems
    .map(listedItem => listedItem.Price)
    .reduce(sumForTotal, 0)
    .toFixed(2);
}

function sumForTotal(total, sum){
    return total + sum;
}

