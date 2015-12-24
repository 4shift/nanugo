class Connection

  VERB_MAP = {
    :get      => Net::HTTP::Get,
    :post     => Net::HTTP::Post,
    :put      => Net::HTTP::Put,
    :delete   => Net::HTTP::Delete
  }

  API_ENDPOINT = "https://www.clebee.net"

  attr_reader :uri, :http

  def initialize(endpoint = API_ENDPOINT)
    @uri = URI.parse(endpoint)
    @http = Net::HTTP.new(uri.host, uri.port)
  end

  def request(method, params)
    case method
    when :get
      full_path = path_with_params(uri.request_uri, params)
      request = VERB_MAP[method].new(full_path)
    else
      request = VERB_MAP[method].new(uri.request_uri)
      request.set_form_data(params)
    end

    response = http.request(request)
  end

  private

  def path_with_params(path, params)
    encoded_params = URI.encode_www_form(params)
    [path, encoded_params].join("?")
  end
end
