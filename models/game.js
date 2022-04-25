class Game 
{
     constructor(id, title, type, price)
     {
         this.id = id;
         this.title = title;
         this.type = type;
         this.price = price;
     }
        //getters and setters for game variables
    get Id()
    {
        return this.id;
    }

    set Id(id)
    {
        this.id = id;
    }

    get Title()
    {
        return this.title;
    }

    set Title(title)
    {
        this.title = title;
    }

     get Type() 
     {
        return this.type;
     }

     set Type(type)
     {
         this.type = type;
     }

     get Price()
     {
         return this.price;
     }

     set Price(price)
     {
         this.price = price;
     }
    
}
module.exports = Game