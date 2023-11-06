import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <div className="left-arrow" style={styles.BackContainer}>
                    <Link to="/">
                        <img src={require('../assets/left_arrow.svg')} alt="Back" style={styles.ImgBackContainer} />
                    </Link>
                </div>
                <p style={styles.headerText}>Privacy Policy</p>
            </View>
            <View style={styles.content}>
                <View style={styles.section}>
                    <p style={styles.sectionTitle}>Your privacy is important to us.</p>
                    <p style={styles.sectionText}>
                        It is our policy to respect your privacy regarding any information we may collect from you across our website and app, if applicable.
                    </p>
                    <p style={styles.sectionText}>
                        We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
                    </p>
                </View>
                <View style={styles.section}>
                    <p style={styles.sectionTitle}>We only retain collected information for as long as necessary.</p>
                    <p style={styles.sectionText}>
                        We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
                    </p>
                    <p style={styles.sectionText}>
                        We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
                    </p>
                </View>
                <View style={styles.section}>
                    <p style={styles.sectionTitle}>Our website may link to external sites.</p>
                    <p style={styles.sectionText}>
                        Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
                    </p>
                    <p style={styles.sectionText}>
                        You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
                    </p>
                </View>
                <View style={styles.section}>
                    <p style={styles.sectionTitle}>Your continued use of our website or app.</p>
                    <p style={styles.sectionText}>
                        Your continued use of our website or app will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
                    </p>
                    <p style={styles.sectionText}>
                        This policy is effective as of 1 September 2023.
                    </p>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
      },
      header: {
        marginTop:0,
        width: '100%',
        height: 60,
        backgroundColor: '#333',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      },
      content: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
      },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 16,
        fontWeight: 400,
        marginBottom: 10,
    },
    BackContainer: {
        position: 'absolute', // Position it absolutely
        left: 5, // Adjust left position as needed
        
      },
    ImgBackContainer: {
        height: '25px',
        width: '25px',
    }
});

export default PrivacyPolicy;
