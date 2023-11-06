import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
    return (
        <View style={styles.container}>

            {/* Section 1: Header */}
            <View style={styles.header}>
                <div style={{ width: '100%', backgroundColor: '#333', padding: '10px 0', position: 'relative' }}>
                    <div className="left-arrow" style={styles.BackContainer}>
                        <Link to="/">
                            <img src={require('../assets/left_arrow.svg')} alt="Back" style={styles.ImgBackContainer} />
                        </Link>
                    </div>
                </div>
            </View>


            <View style={styles.content}>
                {/* Section 2: Who We Are */}
                <View style={styles.section}>
                    <p style={styles.sectionTitle}>Who We Are</p>
                    <p style={styles.sectionText}>
                        Welcome to Scan for Menu, your trusted partner in bringing innovative dining experiences to restaurants and customers alike. We are passionate about revolutionizing the way people interact with menus in restaurants and hospitality establishments.
                    </p>
                    <p style={styles.sectionText}>
                        At Scan for Menu, we believe in the power of technology to enhance dining experiences, streamline operations, and create safer, more efficient environments for both customers and staff.
                    </p>
                </View>

                {/* Section 3: Our Mission */}
                <View style={styles.section}>
                    <p style={styles.sectionTitle}>Our Mission</p>
                    <p style={styles.sectionText}>
                        Our mission is to simplify and elevate the dining experience by offering cutting-edge Scan for Menu solutions to restaurants of all sizes. We aim to:
                    </p>
                    <p style={styles.listItem}>Empower restaurants to provide contactless and convenient menu access to their patrons.</p>
                    <p style={styles.listItem}>Enable customers to make informed dining choices through digital menus accessible via QR codes.</p>
                    <p style={styles.listItem}>Promote sustainability by reducing the need for printed menus and minimizing paper waste.</p>
                    <p style={styles.listItem}>Foster a seamless and enjoyable dining experience for all.</p>
                </View>

                {/* Section 4: What We Do */}
                <View style={styles.section}>
                    <p style={styles.sectionTitle}>What We Do</p>
                    <p style={styles.sectionText}>
                        Scan for Menu specializes in providing state-of-the-art digital menu solutions for the hospitality industry. We offer:
                    </p>
                    <p style={styles.listItem}>Custom QR Code Generation: We create unique QR codes tailored to your restaurant's branding and menu needs.</p>
                    <p style={styles.listItem}>Digital Menu Development: Our team designs and develops intuitive digital menus that showcase your dishes with enticing visuals and detailed descriptions.</p>
                    <p style={styles.listItem}>Real-time Updates: Keep your menu up-to-date with real-time updates, ensuring your customers always see the latest offerings and prices.</p>
                    <p style={styles.listItem}>User-Friendly Experience: We prioritize user-friendliness, ensuring that customers of all technical backgrounds can easily access and navigate your digital menu.</p>
                </View>

                {/* Section 5: Commitment to Quality */}
                <View style={styles.section}>
                    <p style={styles.sectionTitle}>Commitment to Quality</p>
                    <p style={styles.sectionText}>
                        At Scan for Menu, we take pride in delivering high-quality solutions that meet the unique requirements of each restaurant we work with. Our team of experts is dedicated to providing top-notch customer service and technical support.
                    </p>
                </View>

                {/* Section 6: Join Us in the Digital Dining Revolution */}
                <View style={styles.section}>
                    <p style={styles.sectionTitle}>Join Us in the Digital Dining Revolution</p>
                    <p style={styles.sectionText}>
                        We invite restaurants, cafes, bars, and other hospitality establishments to join us in embracing the future of dining. By partnering with Scan for Menu, you not only enhance your guests' experience but also stay ahead of the curve in a rapidly evolving industry.
                    </p>
                </View>

                {/* Section 7: Contact Us */}
                <View style={styles.section}>
                    <p style={styles.sectionTitle}>Contact Us</p>
                    <p style={styles.sectionText}>
                        We're here to answer your questions, discuss your needs, and explore how Scan for Menu can transform your restaurant's dining experience. Get in touch with us today:
                    </p>
                    <p style={styles.listItem}>Email: scanformenu.online@gmail.com</p>
                    <p style={styles.listItem}>Phone: 9108145055</p>
                    <p style={styles.listItem}>Address: Number 84, C V Raman Nagar, Bengaluru, 560093 </p>
                </View>
            </View>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    header: {
        margin: 0,
        width: '100vw',
        height: 15,
        backgroundColor: 'blue', // Change this to your desired header background color
        flexDirection: 'row',
        justifyContent: 'center', // Center header content horizontally
        alignItems: 'center', // Center header content vertically
    },
    content: {
        flex: 1, // This will make the content fill the remaining space below the header
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 700,
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 10,
    },
    listItem: {
        fontSize: 16,
        marginLeft: 20,
    },
    BackContainer: {
        marginTop: '10px',
        marginLeft: '10px',
        marginBottom: '0px',
    },
    ImgBackContainer: {
        height: '25px',
        width: '25px',
    }
});

export default AboutUsPage;
