module ApplicationHelper
  def avatar_icon(user = '', size = nil)
    user.avatar ||= '//d12azzhof0chfb.cloudfront.net/assets/badge/pro-ab68d1d8d707d62bf21719fa226e698f.png'
  end

  def body_data_page
    path = controller.controller_path.split('/')
    namespace = path.first if path.second

    [namespace, controller.controller_name, controller.action_name].compact.join(':')
  end

  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end

  def nl2br(s)
    s.gsub(/\n/, '<br />').html_safe
  end

  def default_meta_tags
    {
      :site             => "나누고",
      :separator        => "·",
      :reverse          => true,
      :description      => "안쓰는 것 나누고 필요한 것 얻자. 신개념 나눔 플랫폼 나누고 (nanugo)",
      :keywords         => "나누고,공유,공유경제,재활용,나눔,기부,중고나라,중고카페,오픈마켓,무료,포인트,중고장터,알뜰장터,중고시장,중고마켓,직거래,벼룩시장,중고,중고상품,중고아이템,중고물품 거래,무료나눔,물물교환,프리마켓",
      :og               => {
        title: "나누고",
        description: "안쓰는 것 나누고 필요한 것 얻자. 신개념 나눔 플랫폼 나누고 (nanugo)",
        site_name: "nanugo",
        site: "nanugo.co.kr",
        url: "http://www.nanugo.co.kr",
        image: "http://res.cloudinary.com/dctb9ebps/image/upload/c_fit,h_300,w_300/v1456023607/nanugo_title_hwdjjl.png",
        type: "website"
      },
      :twitter          => {
        title: "나누고",
        description: "안쓰는 것 나누고 필요한 것 얻자. 신개념 나눔 플랫폼 나누고 (nanugo)",
        card: "summary_large_image",
        url: "http://nanugo.co.kr",
        site: "@nanugo",
        domain: "nanugo.co.kr"
      }
    }
  end

end
