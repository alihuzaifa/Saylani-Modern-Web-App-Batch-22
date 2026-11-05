import Card from "./components/card";

const App = () => {
  const data = [{ name: "", discount: "" }, {}, {}, {}];

  return (
    <>
      {/* <Heading name='Hello' />
      <Heading name='World' /> */}
      <div className="container"></div>
      <Card
        discount={"-25% OFF"}
        image={
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
        }
        category={"Footwear / Sneakers"}
        name={"Premium Red Sneakers"}
        reviewCount={120}
        price={75.0}
      />
      <Card
        discount={"-25% OFF"}
        image={
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
        }
        category={"Footwear / Sneakers"}
        name={"Premium Red Sneakers"}
        reviewCount={120}
        price={75.0}
      />
      <Card
        discount={"-25% OFF"}
        image={
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
        }
        category={"Footwear / Sneakers"}
        name={"Premium Red Sneakers"}
        reviewCount={120}
        price={75.0}
      />
      <Card
        discount={"-25% OFF"}
        image={
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
        }
        category={"Footwear / Sneakers"}
        name={"Bata Sneakers"}
        reviewCount={120}
        price={75.0}
      />
    </>
  );
};

export default App;
