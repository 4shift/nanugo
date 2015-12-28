module V1
  class PaginationSerializer < ActiveModel::Serializer
    def initialize(object, options={})
      meta_key = options[:meta_key] || :meta
      options[meta_key] ||= {}
      options[meta_key][:pagination] = {
        current_page: object.current_page,
        next_page: object.next_page,
        prev_page: object.previous_page,
        total_pages: object.total_pages,
        total_count: object.total_entries
      }
      super(object, options)
    end
  end
end
