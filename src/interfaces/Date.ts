// Extend the type, and declare the new function
export {}

// DATE EXTENSIONS
// ================

declare global {
   interface Date {
      toDateInputValue(): string;
      toCurrentMonthValue(): string;
   }
}
 
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

Date.prototype.toCurrentMonthValue = (function() {
    var date = new Date(this);
    if(date.getDate() <= 10){
        return `${date.getMonth()}/${date.getFullYear()}`;
    }
    return `${date.getMonth()+1}/${date.getFullYear()}`;
});