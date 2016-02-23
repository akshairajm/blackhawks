class MainController < ApplicationController
  def index
    render Rails.root.join('app/assets/index.html').to_s
  end

  def data
    headers = { "Accept" => "application/json", "authorization"=> "Bearer <eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImM4NzQxMDdkLWFmNDctNGFlOC1iMTA1LTFkZTU2MjA1ZWJjZCIsImlhdCI6MTQ1NTA5ODExMSwic3ViIjoiZGV2ZWxvcGVyLzY5OGY2YjNjLWRhMmItMTdiOS1lOWQ0LTdhNmFjNTQwMTBkYyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjYxLjEyLjM3Ljk4Il0sInR5cGUiOiJjbGllbnQifV19.1GwWlxzuvS8jlw80yvN19M0wO8nvEdqyYRNKBrjWSRavRBcTJJx3VSKZu7qLK-SDNP3wsi04jNelxmKuvj02XA>" }
    get_data = HTTParty.get("https://api.clashofclans.com/v1/clans/%23PLJVL8LG", :headers => headers )

    if get_data["reason"].present? && (get_data["reason"] == "accessDenied" || get_data["reason"] == "accessDenied.invalidIp")
      logger.debug "*********************************************"
      logger.debug " Time : #{Time.now.utc}, Access denied"
      logger.debug "*********************************************"
    else
      logger.debug "*********************************************"
      logger.debug " Time : #{Time.now.utc}, API okey!"
      logger.debug "*********************************************"

      File.open("#{Rails.root}/public/sample.txt", 'wb') do |f|
        f.write get_data.parsed_response.to_json
      end
    end
    render file: Rails.root.join('public/sample.txt'), layout: false, content_type: 'text/json'
  end
end
