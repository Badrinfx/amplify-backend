import React,{ Component} from 'react';
import { Svg} from 'expo';

class bottomnav{

    edit =() =>
    {
      return(
        <Svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
    <Svg.Path d='M0 0h24v24H0z' fill='none'/>
    <Svg.Path fill='#000080' d='M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z'
    />
</Svg>

      );
    }

       
     
    }

    const  obj = new bottomnav();
      export default obj;

      
