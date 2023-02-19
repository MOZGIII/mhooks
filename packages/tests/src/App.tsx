import UsePersistentEffectTest from "./tests/UsePersistentEffectTest";
import Test from "./ui/Test";
import Tests from "./ui/Tests";

const App: React.FC = () => (
  <Tests>
    <Test name="use-persistent-effect">
      <UsePersistentEffectTest />
    </Test>
  </Tests>
);

export default App;
