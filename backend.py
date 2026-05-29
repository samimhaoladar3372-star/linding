from datetime import datetime
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder='.', static_url_path='')

PRODUCTS = [
    {
        'id': 'food-1',
        'category': 'Pet Food',
        'section': 'pet-food',
        'title': 'Premium Puppy Kibble',
        'price': 23.99,
        'image': 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=700&q=80',
        'description': 'A balanced meal with vitamins, minerals, and delicious flavor for growing puppies.',
    },
    {
        'id': 'food-2',
        'category': 'Pet Food',
        'section': 'pet-food',
        'title': 'Grain-Free Salmon Bites',
        'price': 29.50,
        'image': 'https://images.unsplash.com/photo-1494256997604-768d1f608cac?auto=format&fit=crop&w=700&q=80',
        'description': 'Soft, grain-free bites packed with salmon protein and natural antioxidants.',
    },
    {
        'id': 'food-3',
        'category': 'Pet Food',
        'section': 'pet-food',
        'title': 'Happy Cat Crunch',
        'price': 19.99,
        'image': 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=700&q=80',
        'description': 'Crunchy cat food with taurine and real chicken for playful cats.',
    },
    {
        'id': 'food-4',
        'category': 'Pet Food',
        'section': 'pet-food',
        'title': 'Vitamin Boost Chews',
        'price': 15.99,
        'image': 'https://images.unsplash.com/photo-1516972810927-80185027ca84?auto=format&fit=crop&w=700&q=80',
        'description': 'Daily vitamin chews to support immunity and coat health.',
    },
    {
        'id': 'toy-1',
        'category': 'Toys',
        'section': 'toys',
        'title': 'Squeaky Plush Ball',
        'price': 12.50,
        'image': 'https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=700&q=80',
        'description': 'Soft plush ball with a joyful squeak for playful fetch sessions.',
    },
    {
        'id': 'toy-2',
        'category': 'Toys',
        'section': 'toys',
        'title': 'Chewy Rope Tug',
        'price': 14.99,
        'image': 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=700&q=80',
        'description': 'Durable rope toy made for tug-of-war and long chewing sessions.',
    },
    {
        'id': 'toy-3',
        'category': 'Toys',
        'section': 'toys',
        'title': 'Cat Feather Wand',
        'price': 9.99,
        'image': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
        'description': 'Lightweight wand toy to stimulate hunting instincts and active play.',
    },
    {
        'id': 'toy-4',
        'category': 'Toys',
        'section': 'toys',
        'title': 'Puzzle Treat Ball',
        'price': 18.99,
        'image': 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=700&q=80',
        'description': 'Interactive treat ball that keeps pets engaged and mentally sharp.',
    },
    {
        'id': 'cage-1',
        'category': 'Cage',
        'section': 'cages',
        'title': 'Cozy Pet Crate',
        'price': 65.00,
        'image': 'https://images.unsplash.com/photo-1495131822220-8dd59073a5c2?auto=format&fit=crop&w=700&q=80',
        'description': 'Comfortable and safe crate for home travel and calm napping.',
    },
    {
        'id': 'cage-2',
        'category': 'Cage',
        'section': 'cages',
        'title': 'Small Animal Cage',
        'price': 48.90,
        'image': 'https://images.unsplash.com/photo-1516216628859-9bccecab13ca?auto=format&fit=crop&w=700&q=80',
        'description': 'Spacious home for rabbits, guinea pigs, and other small pets.',
    },
    {
        'id': 'cage-3',
        'category': 'Cage',
        'section': 'cages',
        'title': 'Travel Carrier',
        'price': 39.99,
        'image': 'https://images.unsplash.com/photo-1571781926716-416b0f1b1a4c?auto=format&fit=crop&w=700&q=80',
        'description': 'Secure carrier designed for stress-free vet trips and travel.',
    },
    {
        'id': 'cage-4',
        'category': 'Cage',
        'section': 'cages',
        'title': 'Luxury Playpen',
        'price': 79.99,
        'image': 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=700&q=80',
        'description': 'A premium playpen with breathable mesh and padded flooring.',
    },
    {
        'id': 'cloth-1',
        'category': 'Pet Clothes',
        'section': 'clothes',
        'title': 'Cozy Winter Sweater',
        'price': 24.00,
        'image': 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=700&q=80',
        'description': 'Soft knit sweater to keep small pets warm and adorable.',
    },
    {
        'id': 'cloth-2',
        'category': 'Pet Clothes',
        'section': 'clothes',
        'title': 'Raincoat Jacket',
        'price': 22.50,
        'image': 'https://images.unsplash.com/photo-1478810810369-a07ef6a3f6b1?auto=format&fit=crop&w=700&q=80',
        'description': 'Waterproof jacket for comfortable walks in rainy weather.',
    },
    {
        'id': 'cloth-3',
        'category': 'Pet Clothes',
        'section': 'clothes',
        'title': 'Holiday Bandana',
        'price': 9.99,
        'image': 'https://images.unsplash.com/photo-1472713274610-1b4430c04d47?auto=format&fit=crop&w=700&q=80',
        'description': 'Festive bandana to make your pet the star of the season.',
    },
    {
        'id': 'cloth-4',
        'category': 'Pet Clothes',
        'section': 'clothes',
        'title': 'Comfort Sleep Tee',
        'price': 18.75,
        'image': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
        'description': 'Lightweight sleep tee for calm evenings and cozy naps.',
    },
]

ORDERS = []

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify({'products': PRODUCTS})

@app.route('/api/products/<product_id>', methods=['GET'])
def get_product(product_id):
    product = next((item for item in PRODUCTS if item['id'] == product_id), None)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    return jsonify(product)

@app.route('/api/checkout', methods=['POST'])
def checkout():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({'error': 'Invalid JSON payload'}), 400

    product_id = data.get('productId')
    payment_method = data.get('paymentMethod')
    customer_name = data.get('customerName', 'Guest')
    email = data.get('email', 'hello@petpalace.shop')

    product = next((item for item in PRODUCTS if item['id'] == product_id), None)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    if payment_method not in {'bKash', 'Nagad', 'Cash on Delivery'}:
        return jsonify({'error': 'Unsupported payment method'}), 400

    order = {
        'orderId': f'ORDER-{len(ORDERS) + 1:04d}',
        'productId': product_id,
        'productTitle': product['title'],
        'paymentMethod': payment_method,
        'customerName': customer_name,
        'email': email,
        'total': round(product['price'] + 5.99, 2),
        'createdAt': datetime.utcnow().isoformat() + 'Z',
    }
    ORDERS.append(order)

    return jsonify({
        'message': 'Order confirmed',
        'order': order,
    })

@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
