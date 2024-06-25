import { useContext, useMemo } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { Colors } from '../constants/styles';
import { OrdersContext } from '../store/order-context';
import ProductItem from '../components/OrderScreenComponents/Productitem';

function FrequentlyOrdered({ navigation }) {
  const authCtx = useContext(AuthContext);
  const ordersCtx = useContext(OrdersContext);

  // Function to count the occurrences of each product
  const countProducts = (orders) => {
    const productCounts = {};
    orders.forEach(order => {
      order.products.forEach(product => {
        if (!productCounts[product.name]) {
          productCounts[product.name] = { ...product, count: product.quantity };
        }
        productCounts[product.name].count += product.quantity;
      });
    });
    return Object.values(productCounts);
  };

  // Memoized product counts to avoid unnecessary recalculations
  const productCounts = useMemo(() => countProducts(ordersCtx.hist || []), [ordersCtx.hist]);

  // Sort the products based on their counts in descending order
  const sortedProducts = useMemo(() => {
    return productCounts.sort((a, b) => b.count - a.count);
  }, [productCounts]);

  return (
    <View style={{ flex: 1, backgroundColor: authCtx.darkMode ? Colors.darkprimary : Colors.primary100, resizeMode: 'cover', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }} >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={{ flex: 1, marginBottom: 10 }}>
          <View style={[styles.secctr, { backgroundColor: authCtx.darkMode ? Colors.darksec : Colors.white }]}>
            <Text style={[styles.sectionTitle, { color: authCtx.darkMode ? Colors.white : '#000' }]}>Frequently Ordered Products</Text>
            <Text style={[styles.sectionTitle,{color:authCtx.darkMode ? Colors.white : '#000'}]}></Text>
          </View>
        </View>
        {
          sortedProducts.map((product, index) => (
            <View style={[styles.productContainer, { backgroundColor: authCtx.darkMode ? Colors.darksec : Colors.primary100 }]} key={index}>
              <ProductItem product={product} quantity={true} />
              <Text style={[styles.productCount, { color: authCtx.darkMode ? Colors.white : '#fff' }]}>Ordered {product.count-1} times</Text>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  scrollView: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  secctr: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 8,
    borderRadius: 10, 
    alignItems: 'center', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%'
  },
  productContainer: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productCount: {
    fontSize: 16,
    marginVertical: 2,
    textAlign: 'center',
  },
});

export default FrequentlyOrdered;
