module ItemsHelper
  def make_subcategory_link value
    categories = value.split(' > ')

    department = categories[0]
    subcategory = categories[1]

    href = "/postings/#{parameterlize(department)}/#{parameterlize(subcategory)}"
    link_to subcategory, href
  end

  def parameterlize value
    value.downcase().gsub(" ", "-").gsub("&", "and")
  end
end
