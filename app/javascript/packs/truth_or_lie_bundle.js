import ReactOnRails from 'react-on-rails';

import TruthOrLie from '../bundles/TruthOrLie/components/TruthOrLie';
import Vote from '../bundles/TruthOrLie/components/Vote';
import Result from '../bundles/TruthOrLie/components/Result';
import ApiService from '../bundles/TruthOrLie/services/ApiService';

// This is how react_on_rails can see the TruthOrLie in the browser.
ReactOnRails.register({
  TruthOrLie
});
