import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Layout from '../component/Layout/Layout'
import styles from '../styles/Home.module.css'

export default class Home extends React.Component {
  render() {
    return (
      <Layout >
        <div className={styles.form}>

        </div>
      </Layout>
    )
  }
}

