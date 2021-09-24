import React from "react";
import Layout from "../component/Layout/Layout";
import styles from '../styles/create-business-card.module.css'


export default class CreateBusinessCard extends React.Component{

    constructor(props){
        super(props)
        this.state = {

        }
    }

    async onSubmit(e){
        e.preventDefault()
        console.log('ktm');
    }

    render() {
        return (
             <Layout title={'Create Business Card'}>
                 <div className={styles.container}>
                     <div className={styles.cardForm}>
                         <form onSubmit={() => this.onSubmit}>
                             <h3>Crea la tua business card</h3>
                             <label htmlFor="name">
                                 Nome <input type="text" id={'name'}  placeholder={'Inserisci il tuo nome completo'}/>
                             </label>
                             <label htmlFor="mail">
                                 Email <input type="text" id={'mail'}  placeholder={'Inserisci la tua mail'} />
                             </label>
                         </form>
                     </div>
                 </div>

             </Layout>
        );
    }

}