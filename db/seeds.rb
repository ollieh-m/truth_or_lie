propositions = YAML.load_file(Rails.root.join('db', 'propositions.yml'))

propositions.each do |proposition|
  if existing_proposition = Proposition.find_by(truth_or_lie: proposition[:truth_or_lie])
    existing_proposition.update_attributes!(proposition)
  else
    Proposition.create!(proposition)
  end
end
