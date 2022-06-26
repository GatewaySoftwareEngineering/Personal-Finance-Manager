export const getTransactions = async () => {
    let data=[]
      data= await JSON.parse(localStorage.getItem("transactions_list"));
      if(data==null){
        data=[]
      }
      
     return data
  }


