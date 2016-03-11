# Use this hook to configure merit parameters
Merit.setup do |config|
  # Check rules on each request or in background
  # config.checks_on_each_request = true

  # Define ORM. Could be :active_record (default) and :mongoid
  # config.orm = :active_record

  # Add application observers to get notifications when reputation changes.
  # config.add_observer 'MyObserverClassName'

  # Define :user_model_name. This model will be used to grand badge if no
  # `:to` option is given. Default is 'User'.
  # config.user_model_name = 'User'

  # Define :current_user_method. Similar to previous option. It will be used
  # to retrieve :user_model_name object if no `:to` option is given. Default
  # is "current_#{user_model_name.downcase}".
  # config.current_user_method = 'current_user'
end

Merit::Badge.create!(
  id: 1,
  name: "Bronze",
  description: "나눔 실천 10개 미만",
  custom_fields: { difficulty: :bronze }
)
Merit::Badge.create!(
  id: 2,
  name: "Silver",
  description: "나눔 실천 10개 이상 50개 미만",
  custom_fields: { difficulty: :silver, image_url: "//d12azzhof0chfb.cloudfront.net/assets/badge/star-144aa30b642fd43d21e2f8477223c336.png" }
)
Merit::Badge.create!(
  id: 3,
  name: "Gold",
  description: "나눔 실천 50개 이상",
  custom_fields: { difficulty: :gold, image_url: "//d12azzhof0chfb.cloudfront.net/assets/badge/pro-ab68d1d8d707d62bf21719fa226e698f.png" }
)
Merit::Badge.create!(
  id: 4,
  name: 'Pioneer',
  description: "최초 100명까지 개척자",
  image: '//res.cloudinary.com/dctb9ebps/image/upload/v1457591029/pioneer_badge_u62qu0.png'
)
