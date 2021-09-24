import React from "react";
import Layout from "../component/Layout/Layout";
import styles from '../styles/slug.module.css';
import { FaDownload, FaEnvelope, FaFilePowerpoint, FaGlobe, FaMapMarkerAlt, FaPhone, } from "react-icons/fa";
import { ADMIN_BUSINESS_CARD } from "../lib/api";
import { slugify } from "../lib/utils";




export async function getServerSideProps({ params }) {
    const slug = params.slug
    return {
        props: {
            slug
        }
    }
}

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null
        }
        this.generatevCard = this.generatevCard.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await fetch(`${ADMIN_BUSINESS_CARD}/profiles/${this.props.slug}`);
            if (response.status < 400) {
                const json = await response.json();
                //const profile = (json || []).find(item => this.props.slug === slugify(item.name));
                this.setState({
                    profile: json ? json : null
                })
            }

        } catch (e) {
            console.error(e);
        }
    }
    async generatevCard() {
        try {
            const option = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(this.state.profile)
            }
            const response = await fetch('/api/gen-v-card', option);
            const json = await response.blob();
            const blob = new Blob([json], { type: "text/vcard;charset=utf-8" });
            const url = window.URL.createObjectURL(blob);
            window.open(url);

        } catch (err) {

            console.error(err);
            return;

        }
    }
    render() {

        return (
            <Layout title={this.state.profile ? this.state.profile.name : ''} description={this.state.profile ? this.state.profile.role : ''}>
                {this.state.profile ? <div className={styles.wrapper}>
                    <div className={styles.card}>
                        <div className={styles.cardUp}>
                            <img src="https://www.nextadv.it/wp-content/uploads/2020/10/Next-ADV-Logo-Payoff-Blu.svg" alt="next" className={styles.logo} height="129" />
                            <h1 className={styles.name}>
                                {this.state.profile.name}
                            </h1>
                            <p className={styles.role}>
                                {this.state.profile.role}
                            </p>
                            <div className={styles.hr}></div>
                            <div className={styles.list}>
                                <a href={`tel:${this.state.profile.phone}`}>
                                    <div className={styles.box}>
                                        <FaPhone size={'20px'} />
                                    </div>
                                </a>

                                <div className={styles.box} onClick={this.generatevCard}>
                                    <FaDownload size={'20px'} />
                                </div>

                                <a href={`mailto:${this.state.email}`}>
                                    <div className={styles.box}>
                                        <FaEnvelope size={'20px'} />
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className={styles.cardDown}>
                            <h2 className={styles.name} style={{ color: '#fff' }}>Next <span style={{ color: '#E7405C' }}>A</span><span style={{ color: '#f39939' }}>D</span><span style={{ color: '#52c1ed' }}>V</span></h2>
                            <div className={styles.listSociety}>
                                <a href={'tel:+390640062033'}>
                                    <div className={styles.info}>
                                        <FaPhone size={'20px'} />
                                    </div>
                                </a>
                                <a href={'mailto:info@nextadv.it'}>
                                    <div className={styles.info}>
                                        <FaEnvelope size={'20px'} />
                                    </div>
                                </a>
                                <a href={'https://www.nextadv.it/'} target="_blank" rel="www.nextadv.it">
                                    <div className={styles.info}>
                                        <FaGlobe size={'20px'} />
                                    </div>
                                </a>
                                <a href="https://www.google.com/maps/place/Via+dei+Granai+di+Nerva,+48,+00142+Roma+RM/data=!4m2!3m1!1s0x13258a49d828da85:0x352a0991b27c0acb?sa=X&ved=2ahUKEwiRi_yypI3zAhVB3KQKHX_rAdkQ8gF6BAgLEAE" target="_blank" >
                                    <div className={styles.info}>
                                        <FaMapMarkerAlt size={'20px'} />
                                    </div>
                                </a>
                                <a href="https://drive.google.com/file/d/10K5-qXUNfrue9glRuIUmPdfjUsKp8Qak/view" target="_blank" >
                                    <div className={styles.info}>
                                        <FaFilePowerpoint size={'20px'} />
                                    </div>
                                </a>

                            </div>
                        </div>
                    </div>
                </div> : null}


            </Layout>
        );
    }
}